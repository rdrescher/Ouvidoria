using AutoMapper;

namespace Ouvidoria.Application.AutoMapper
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration RegisterMappings()
        {
            return new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new DomainToDTOMappingProfile());
                cfg.AddProfile(new DTOToDomainMappingProfile());
            });
        }
    }
}
