﻿namespace OnlineTraining.Repositories.Interfaces
{
    public interface IUserRepository
    {
        bool Authentication(string username, string password);
    }
}