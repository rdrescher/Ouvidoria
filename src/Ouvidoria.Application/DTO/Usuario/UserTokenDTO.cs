using System.Collections.Generic;

namespace Ouvidoria.Application.DTO
{
    public class UserTokenDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public IEnumerable<ClaimDTO> Claims { get; set; }
    }
}