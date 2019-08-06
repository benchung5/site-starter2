import {
    BACKUP_DB,
    BACKUP_DB_ERROR
} from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        case BACKUP_DB_ERROR:
            return { ...state, backupDbError: action.payload };
        case BACKUP_DB:
            return { ...state, backupDbSuccess: action.payload };
    }
    return state;
}