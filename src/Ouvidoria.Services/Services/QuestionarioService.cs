using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.DTO;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioService : EntityService, IQuestionarioService
    {
        private readonly IQuestionarioRepository _repository;
        public QuestionarioService(
            IQuestionarioRepository repository,
            INotificador notificador) : base(notificador)
        {
            _repository = repository;
        }

        public async Task Create(Questionario quiz)
        {
            if (!base.Validate(new QuestionarioValidation(), quiz)) return;

            foreach (var question in quiz.Perguntas)
            {
                if (!base.Validate(new PerguntaValidation(), question)) return;
                if (question.Opcoes.Count > 0)
                    foreach (var option in question.Opcoes)
                        if (!base.Validate(new OpcaoValidation(), option)) return;
            }

            if (!IsValidPeriod(quiz.DataInicio)) return;

            await _repository.Create(quiz);
        }

        public void Dispose() => _repository.Dispose();

        public async Task<Questionario> GetById(int idQuestionario) =>
            await _repository.GetByIdWithQuestions(idQuestionario);

        public async Task<List<Questionario>> GetPreviewList(int userId) =>
            await _repository.GetPreviewList(userId);

        public async Task<List<Questionario>> GetQuizzes() =>
            await _repository.GetAllInfos();

        public async Task<QuestionarioDTO> GetQuizForReport(int id)
        {
            var quiz = await _repository.GetQuizForReport(id);

            if (quiz == null)
                Notify("Questionário não encontrado");

            if(quiz != null && quiz.NumeroRespostas == 0)
                Notify("O questionário ainda não possui respostas");

            return quiz;
        }

        private bool IsValidPeriod(DateTime startDate)
        {
            if (startDate >= DateTime.Now.Date) return true;

            Notify("A data inicial não pode ser anterior à data de hoje");
            return false;
        }
    }
}