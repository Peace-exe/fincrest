import { create } from 'zustand';
import {devtools , persist} from 'zustand/middleware';

type Role = "user" | "admin";

interface RoleStore {
  role: Role;
  setRole: (role: Role) => void;
}

const useRoleStore = create<RoleStore>()(
devtools(
    persist(
        (set) => ({
            role: "user",
            setRole: (role) => set({ role }),
        }),
        {name:'role-storage'}
    ),
    {name:"RoleStore"}
)

    
);

export default useRoleStore;