using System;

namespace Ouvidoria.Application.Utils
{
    public class Resultado
    {
        public bool   Success { get; }
        public string Message { get; }

        public Resultado(bool success, string message)
        {
            this.Success = success;
            this.Message = message;
        }

        public Resultado(bool success) : this(success, null)
        { }

        public static Resultado Successfull(string message)
        {
            return new Resultado(true, message);
        }

        public static Resultado Successfull()
        {
            return new Resultado(true, null);
        }

        public static Resultado Failed(string message)
        {
            return new Resultado(false, message);
        }

        public static Resultado Failed()
        {
            return new Resultado(false, null);
        }
    }

    public class Resultado<T> : Resultado
    {
        public T Data { get; }

        public Resultado(bool success, string message) : base(success, message)
        { }

        public Resultado(bool success) : base(success, null)
        { }

        public Resultado(bool success, T data, string message) : base(success, message)
        {
            this.Data = data;
        }

        public Resultado(bool success, T data) : this(success, data, null)
        { }

        public static Resultado<T> Successfull(T data)
        {
            return new Resultado<T>(true, data);
        }

        public static new Resultado<T> Failed()
        {
            return new Resultado<T>(false, default(T));
        }

        public static new Resultado<T> Failed(string message)
        {
            return new Resultado<T>(false, default(T), message);
        }
    }
}