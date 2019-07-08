using System;
using DevIO.Business.Models.Validations.Documentos;
using FluentValidation;
using Ouvidoria.Domain.Enums;
using Ouvidoria.Domain.Models;

namespace Ouvidoria.Domain.Validations.Models
{
    public class UsuarioValidation : AbstractValidator<Usuario>
    {
        public UsuarioValidation()
        {
            RuleFor(u => u.Nome)
                .NotEmpty().WithMessage("Por favor, preencha o nome")
                .Length(2, 100).WithMessage("O nome deve conter entre 2 e 100 caracteres");

            RuleFor(u => u.Senha)
                .NotEmpty().WithMessage("Por favor, informe sua senha");

            When(u => !String.IsNullOrEmpty(u.Telefone), () =>
            {
                RuleFor(u => u.Telefone)
                    .Length(9, 15).WithMessage("O telefone deve conter entre 9 e 15 caracteres");

            });

            RuleFor(u => CpfValidacao.Validar(u.CPF)).Equal(true)
                .WithMessage("O CPF fornecido é inválido.");

            RuleFor(u => Enum.IsDefined(typeof(UsuarioPerfil), u.UsuarioPerfil)).Equal(true)
                .WithMessage("O perfil informado é inválido.");

            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("Informe o e-mail")
                .EmailAddress().WithMessage("O e-mail deve ser válido")
                .Length(5, 100).WithMessage("O e-mail deve conter entre 5 e 100 caracteres");
        }
    }
}
