using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ouvidoria.Domain.Interfaces;
using Ouvidoria.Domain.Models;
using Ouvidoria.Domain.Validations.Models;
using Ouvidoria.Services.Interfaces;

namespace Ouvidoria.Services
{
    public class QuestionarioService : EntityService, IQuestionarioService
    {
        private readonly INotificador _notificador;
        private readonly IQuestionarioRepository _repository;
        public QuestionarioService(
            IQuestionarioRepository repository,
            INotificador notificador) : base(notificador)
        {
            _repository = repository;
            _notificador = notificador;
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

            if (!IsValidPeriod(quiz.DataInicio, quiz.DataFim)) return;

            await _repository.Create(quiz);
        }

        public void Dispose()
        {
            _repository.Dispose();
        }

        public async Task<List<Questionario>> GetQuizzes() =>
            await _repository.GetAllInfos();

        private bool IsValidPeriod(DateTime startDate, DateTime endDate)
        {
            if (startDate >= DateTime.Now.Date) return true;

            Notify("A data inicial não pode ser anterior à data de hoje");
            return false;
        }
    }
}