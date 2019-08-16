namespace Ouvidoria.Application.Utils
{
    public class Resultado
    {
        public bool Success { get; }
        public string[] Messages { get; }

        public Resultado(bool success, string[] message)
        {
            this.Success = success;
            this.Messages = message;
        }

        public Resultado(bool success, string message)
        {
            this.Success = success;
            if (!string.IsNullOrEmpty(message))
                this.Messages = new string[] { message };
        }

        public Resultado(bool success) : this(success, "")
        { }

        public static Resultado Successfull(string[] messages)
        {
            return new Resultado(true, messages);
        }
        public static Resultado Successfull(string message)
        {
            return new Resultado(true, message);
        }

        public static Resultado Successfull()
        {
            return new Resultado(true, "");
        }

        public static Resultado Failed(string[] messages)
        {
            return new Resultado(false, messages);
        }

        public static Resultado Failed(string message)
        {
            return new Resultado(false, message);
        }

        public static Resultado Failed()
        {
            return new Resultado(false, "");
        }
    }

    public class Resultado<T> : Resultado
    {
        public T Data { get; }

        public Resultado(bool success, string message) : base(success, message)
        { }

        public Resultado(bool success, string[] messages) : base(success, messages)
        { }

        public Resultado(bool success) : base(success, "")
        { }

        public Resultado(bool success, T data, string message) : base(success, message)
        {
            this.Data = data;
        }

        public Resultado(bool success, T data, string[] messages) : base(success, messages)
        {
            this.Data = data;
        }

        public Resultado(bool success, T data) : this(success, data, "")
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

        public static new Resultado<T> Failed(string[] messages)
        {
            return new Resultado<T>(false, default(T), messages);
        }
    }
}