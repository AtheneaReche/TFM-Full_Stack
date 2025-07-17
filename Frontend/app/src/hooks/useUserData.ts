import { useContext } from 'react';
import { UserDataContext, type UserDataContextType } from '../contexts/UserDataContext.ts';

export const useUserData = (): UserDataContextType => {
    const context = useContext(UserDataContext);
    if (context === undefined) {
        throw new Error('useUserData must be used within a UserDataProvider');
    }
    return context;
};