namespace Ouvidoria.Api.Extensions
{
    public class JWTSettings
    {
        public string Secret { get; set; }
        public int ExpirationTime { get; set; }
        public string Issuer { get; set; }
        public string ValidIn { get; set; }
    }
}