namespace Ouvidoria.Application.ViewModel
{
    public class GenericList
    {
        public GenericList(int id, string description)
        {
            this.id = id;
            this.description = description;
        }
        public int id { get; private set; }
        public string description { get; private set; }
    }
}