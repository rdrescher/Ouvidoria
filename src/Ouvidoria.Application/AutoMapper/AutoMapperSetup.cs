using AutoMapper;

namespace Ouvidoria.Application.AutoMapper
{
    public class AutoMapperSetup
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
