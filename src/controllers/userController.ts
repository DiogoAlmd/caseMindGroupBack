import { NextFunction, Request, Response } from 'express';
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Connect, Query } from '../config/mysql';

class UserController {
    async getUserById(req: Request, res: Response, next: NextFunction){
        const userId = req.params.id;
    
        let query = `SELECT * FROM user WHERE id = ${userId}`;
    
        Connect()
            .then((connection) => {
                Query(connection, query)
                    .then((results: any) => {
                        if (results.length === 0) {
                            return res.status(404).json({
                                message: 'User not found'
                            });
                        }
    
                        return res.status(200).json({
                            user: results[0]
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            message: 'Internal server error',
                            error
                        });
                    })
                    .finally(() => {
                        connection.end();
                    });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: 'Internal server error',
                    error
                });
            });
    }

    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            // Hash da senha
            const encryptedPassword = await bcrypt.hash(password, 10);

            // Query SQL de inserção
            const query = `INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${encryptedPassword}')`;

            Connect()
            .then((connection) => {
                Query(connection, query)
                .finally(() => {
                    connection.end();
                });
                res.status(201).json({ message: 'User created successfully' });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: 'Creating a user was unsuccessfully',
                    error
                });
            });
        } catch (error) {
            // Se houver um erro, retorna um erro de servidor
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async login(req: Request, res: Response) {
        const { name, password } = req.body;

        try {
            // Consulta SQL para obter o usuário pelo nome
            const query = `SELECT * FROM user WHERE name = '${name}'`;

            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then((results: any) => {
                            if (results.length === 0) {
                                return res.status(404).json({ message: 'User not found' });
                            }

                            const user = results[0];

                            bcrypt.compare(password, user.password, (err, result) => {
                                if (err || !result) {
                                    return res.status(401).json({ message: 'Incorrect password' });
                                }

                                const token = jwt.sign({ id: user.id }, 'yourSecretKey', { expiresIn: '2d' });
                                res.status(200).json({ name: user.name, token });
                            });
                        })
                        .catch((error) => {
                            res.status(500).json({ error: error.message });
                        })
                        .finally(() => {
                            connection.end();
                        });
                })
                .catch((error) => {
                    res.status(500).json({ error: error.message });
                });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new UserController();
