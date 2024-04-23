// product.model.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';  // assuming you have a database configuration file
import User from './user'; // Importing the User model

interface ProductAttributes {
  id: number;
  user_id: number;
  name: string;
  description: string | null;
  image: Buffer | null;
  price: number;
  stock_quantity: number;
}

interface ProductInstance extends Model<ProductAttributes>, ProductAttributes {}

const Product = sequelize.define<ProductInstance>(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'product', // Specify the actual table name
    timestamps: false // Assuming there are no timestamp columns in the table
  }
);

export default Product;
