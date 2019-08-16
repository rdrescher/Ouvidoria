using System.Security.Cryptography;
using System.Text;

namespace Ouvidoria.Domain.Utils
{
    public static class HashMD5
    {
        public static string GenerateHashMD5(string senha)
        {
            MD5 md5Hash = MD5.Create();
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(senha));

            StringBuilder hash = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                hash.Append(data[i].ToString("x2"));
            }

            return hash.ToString();
        }
    }
}