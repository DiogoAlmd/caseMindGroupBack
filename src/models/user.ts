// user.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize'; 

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'user', // Specify the actual table name
    timestamps: false // Assuming there are no timestamp columns in the table
  }
);

export default User;
