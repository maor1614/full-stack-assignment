import { User } from '../types';

interface Props {
  users: User[];
  currentUserId: number;
  onChange: (id: number) => void;
}

export default function UserSelector({
  users,
  currentUserId,
  onChange,
}: Props) {
  return (

    <select
      value={currentUserId}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
      
    </select>
    
  );
}
