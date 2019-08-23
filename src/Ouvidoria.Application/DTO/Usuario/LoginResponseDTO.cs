namespace Ouvidoria.Application.DTO
{
    public class LoginResponseDTO
    {
        public string AccessToken { get; set; }
        public double ExpiresIn { get; set; }
        public UserTokenDTO User { get; set; }
    }
}