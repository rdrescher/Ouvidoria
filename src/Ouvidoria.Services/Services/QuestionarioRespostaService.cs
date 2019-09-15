using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioRespostaService : EntityService, IQuestionarioRespostaService
    {
        private readonly IQuestionarioRespostaRepository _repository;
        private readonly IQuestionarioService _questionarioService;
        private readonly IUsuarioService _usuarioService;
        public QuestionarioRespostaService(
            IQuestionarioRespostaRepository repository,
            IQuestionarioService questionarioService,
            INotificador notificador,
            IUsuarioService usuarioService
        ) : base(notificador)
        {
            _repository = repository;
            _questionarioService = questionarioService;
            _usuarioService = usuarioService;
        }
        public void Dispose() => _repository.Dispose();

        public async Task Create(QuestionarioResposta resposta)
        {
            if (!base.Validate(new QuestionarioRespostaValidation(), resposta)) return;
            var quiz = await _questionarioService.GetById(resposta.IdQuestionario);
            if (!IsValidQuiz(quiz)) return;
            if (!await UserCanAnswer(quiz.Id, resposta.IdUsuario)) return;
            if (!HasValidAnswers(quiz, resposta.Respostas)) return;

            await _repository.Create(resposta);
        }

        private async Task<bool> UserCanAnswer(int idQuestionario, int idUsuario)
        {
            var user = await _usuarioService.GetUserById(idUsuario);
            if (!user.Ativo)
            {
                Notify("Você está inapto para responder");
                return false;
            }

            if ((await _repository.Search(x => x.IdQuestionario == idQuestionario && x.IdUsuario == idUsuario)).Count > 0)
            {
                Notify("Você já respondeu este questionário");
                return false;
            }

            return true;
        }

        private bool HasValidAnswers(Questionario quiz, List<Resposta> respostas)
        {
            if (quiz.Perguntas.Count != respostas.Count)
            {
                Notify("O número de respostas não condiz com o número de perguntas do questionário");
                return false;
            }

            var answersIds = respostas.Select(x => x.IdPergunta);

            if (answersIds.GroupBy(id => id).Any(c => c.Count() > 1))
            {
                Notify("Há respostas com Ids repetidos");
                return false;
            }

            foreach (var question in quiz.Perguntas)
            {
                if (!answersIds.Contains(question.Id))
                {
                    Notify("O Id de uma ou mais respostas não condiz com os Ids das perguntas do questionário");
                    return false;
                }

                var answer = respostas.FirstOrDefault(x => x.IdPergunta == question.Id);
                if (!Validate(new RespostaValidation(question.Tipo), answer)) return false;

                if (question.Tipo == TipoPergunta.Objetiva)
                {
                    if (!question.Opcoes.Select(x => x.Id).Contains(answer.IdOpcao.Value))
                    {
                        Notify("O Id de uma ou mais opções não condiz com os Ids das opções das perguntas do questionário");
                        return false;
                    }
                }
            }

            return true;
        }

        private bool IsValidQuiz(Questionario questionario)
        {
            if (questionario == null)
            {
                Notify("Questionário não encontrado");
                return false;
            }
            if (questionario.DataInicio > DateTime.Now || questionario.DataFim < DateTime.Now)
            {
                Notify("O questionário não está disponível para ser respondido");
                return false;
            }
            return true;
        }

        public async Task IsUserAbleToAnswer(int idQuestionario, int idUsuario)
        {
            var quiz = await _questionarioService.GetById(idQuestionario);
            if (!IsValidQuiz(quiz)) return;
            await this.UserCanAnswer(idQuestionario, idUsuario);
        }
    }
}