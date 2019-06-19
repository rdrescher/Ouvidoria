using System.Collections.Generic;
using Ouvidoria.Domain.Notificacoes;

namespace Ouvidoria.Domain.Interfaces
{
    public interface INotificador
    {
        List<Notificacao> GetNotifications();
        void Handle(Notificacao notificacao);
        bool HasNotification();
    }
}