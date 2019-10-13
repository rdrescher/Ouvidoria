using System.Collections.Generic;

namespace Ouvidoria.Domain.DTO
{
    public class QuestionarioDTO
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public List<PerguntaDTO> Perguntas { get; set; }
        public int NumeroRespostas { get; set; }
    }
}