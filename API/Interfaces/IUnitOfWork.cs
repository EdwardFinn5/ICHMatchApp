namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        IAcBulletRepository AcBulletRepository { get; }
        ICardUserRepository CardUserRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ICiempLocationRepository CiempLocationRepository { get; }
        ICiLocationRepository CiLocationRepository { get; }
        ICollegeRepository CollegeRepository { get; }
        ICoLocationRepository CoLocationRepository { get; }
        IDutyBulletRepository DutyBulletRepository { get; }
        IEmpIndustryRepository EmpIndustryRepository { get; }
        IEmpInfoRepository EmpInfoRepository { get; }
        ILikesRepository LikesRepository { get; }
        IMajorRepository MajorRepository { get; }
        INewsRepository NewsRepository { get; }
        IPosCategoryRepository PosCategoryRepository { get; }
        IPosition2Repository Position2Repository { get; }
        IPositNameRepository PositNameRepository { get; }
        IProfileAdviceRepository ProfileAdviceRepository { get; }
        IRegisterCodeRepository RegisterCodeRepository { get; }
        ISkillsBulletRepository SkillsBulletRepository { get; }
        IStempLocationRepository StempLocationRepository { get; }
        IStLocationRepository StLocationRepository { get; }
        IStudInfoRepository StudInfoRepository { get; }
        IWorkBulletRepository WorkBulletRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}