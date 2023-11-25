export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  roleId: string;
}

export interface UserQuery {
  users: User[];
  materiales: Material[];
  inventarios: Inventario[];
}

export interface Role {
  id: string;
  name: string;
  createAt: Date;
  updatedAt: Date;
}

export interface RolesQuery {
  roles: Role[];
}

export interface Material {
  id: string;
  fechaCreacion: string;
  nombre: string;
  saldo: string;
  creadoPor: string;
}

export interface Inventario {
  id: string;
  fecha: string;
  entrada: string;
  salida: string;
  responsable: string;
}
