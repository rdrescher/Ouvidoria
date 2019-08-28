using System.Collections.Generic;
using System.Linq;
using Ouvidoria.Domain.Interfaces;

namespace Ouvidoria.Domain.Notificacoes
{
    public class Notificador : INotificador
    {
        private List<Notificacao> Notificacoes;

        public Notificador() => Notificacoes = new List<Notificacao>();


        public void Handle(Notificacao notificacao) => Notificacoes.Add(notificacao);


        public List<Notificacao> GetNotifications() => Notificacoes;

        public bool HasNotification() => Notificacoes.Any();

        public string[] GetNotificationsMessages() =>
            GetNotifications().Select(x => x.Mensagem).ToArray();
    }
}