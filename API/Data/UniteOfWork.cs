using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class UniteOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UniteOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public IAcBulletRepository AcBulletRepository => new AcBulletRepository(_context, _mapper);

        public ICardUserRepository CardUserRepository => new CardUserRepository(_context);

        public ICategoryRepository CategoryRepository => new CategoryRepository(_context, _mapper);

        public ICiempLocationRepository CiempLocationRepository => new CiempLocationRepository(_context, _mapper);

        public ICiLocationRepository CiLocationRepository => new CiLocationRepository(_context, _mapper);

        public ICollegeRepository CollegeRepository => new CollegeRepository(_context, _mapper);

        public ICoLocationRepository CoLocationRepository => new CoLocationRepository(_context, _mapper);

        public IDutyBulletRepository DutyBulletRepository => new DutyBulletRepository(_context, _mapper);

        public IEmpIndustryRepository EmpIndustryRepository => new EmpIndustryRepository(_context, _mapper);

        public IEmpInfoRepository EmpInfoRepository => new EmpInfoRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context);

        public IMajorRepository MajorRepository => new MajorRepository(_context, _mapper);

        public INewsRepository NewsRepository => new NewsRepository(_context, _mapper);

        public IPosCategoryRepository PosCategoryRepository => new PosCategoryRepository(_context, _mapper);

        public IPosition2Repository Position2Repository => new Position2Repository(_context, _mapper);

        public IPositNameRepository PositNameRepository => new PositNameRepository(_context, _mapper);

        public IProfileAdviceRepository ProfileAdviceRepository => new ProfileAdviceRepository(_context, _mapper);

        public IRegisterCodeRepository RegisterCodeRepository => new RegisterCodeRepository(_context, _mapper);

        public ISkillsBulletRepository SkillsBulletRepository => new SkillsBulletRepository(_context, _mapper);

        public IStempLocationRepository StempLocationRepository => new StempLocationRepository(_context, _mapper);

        public IStLocationRepository StLocationRepository => new StLocationRepository(_context, _mapper);

        public IStudInfoRepository StudInfoRepository => new StudInfoRepository(_context, _mapper);

        public IWorkBulletRepository WorkBulletRepository => new WorkBulletRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}