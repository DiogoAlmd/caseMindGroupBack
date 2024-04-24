import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Connect, Query } from '../config/mysql';

class ProductController {
    async create(request: Request, response: Response) {
        const { name, description, image, price, stock_quantity } = request.body;

        // Verifica se o token JWT está presente no cabeçalho da solicitação
        // const token = request.headers.authorization?.split(' ')[1];
        // if (!token) {
        //     return response.status(401).json({ message: 'Unauthorized' });
        // }

        try {
            // Extrai o payload do token JWT
            // const decodedToken: any = jwt.verify(token, 'yourSecretKey');
            // const user_id = decodedToken.id;
            const user_id = 2;

            // Query SQL para inserir o produto
            const query = `INSERT INTO product (user_id, name, description, image, price, stock_quantity) 
                           VALUES (${user_id}, '${name}', '${description}', '${image}', ${price}, ${stock_quantity})`;

            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then(() => {
                            connection.end();
                            response.status(201).json({ message: 'Product created successfully' });
                        })
                        .catch((error) => {
                            connection.end();
                            response.status(500).json({ error: error.message });
                        });
                })
                .catch((error) => {
                    response.status(500).json({ error: error.message });
                });
        } catch (error) {
            response.status(401).json({ message: 'Invalid token' });
        }
    }

    async listProductById(request: Request, response: Response) {
        const productId = request.params.id; // Obter o ID do produto dos parâmetros da URL
        try {
            // Verifica se o token JWT está presente no cabeçalho da solicitação
            // const token = request.headers.authorization?.split(' ')[1];
            // if (!token) {
            //     return response.status(401).json({ message: 'Unauthorized' });
            // }

            // Extrai o payload do token JWT
            // const decodedToken: any = jwt.verify(token, 'yourSecretKey');
            // const user_id = decodedToken.id;
            const user_id = 2;

            // Query SQL para buscar o produto pelo ID
            const query = `SELECT * FROM product 
                           WHERE id = ${productId} AND user_id = ${user_id}`;

            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then((results: any) => {
                            connection.end();
                            if (results.length === 0) {
                                return response.status(404).json({ message: 'Product not found' });
                            }
                            return response.status(200).json({ product: results[0] });
                        })
                        .catch((error) => {
                            connection.end();
                            return response.status(500).json({ error: error.message });
                        });
                })
                .catch((error) => {
                    return response.status(500).json({ error: error.message });
                }
            );
        } catch (error) {
            return response.status(401).json({ message: 'Invalid token' });
        }
    }

    async listProducts(request: Request, response: Response) {
        // Verifica se o token JWT está presente no cabeçalho da solicitação
        // const token = request.headers.authorization?.split(' ')[1];
        // if (!token) {
        //     return response.status(401).json({ message: 'Unauthorized' });
        // }
    
        try {
            // Extrai o payload do token JWT
            // const decodedToken: any = jwt.verify(token, 'yourSecretKey');
            // const user_id = decodedToken.id;
            const user_id = 2;
    
            // Query SQL para buscar todos os produtos associados ao user_id
            const query = `SELECT * FROM product 
                           WHERE user_id = ${user_id}`;
    
            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then((results: any) => {
                            connection.end();
                            if (results.length === 0) {
                                return response.status(404).json({ message: 'No products found for this user' });
                            }
                            return response.status(200).json({ products: results });
                        })
                        .catch((error) => {
                            connection.end();
                            return response.status(500).json({ error: error.message });
                        });
                })
                .catch((error) => {
                    return response.status(500).json({ error: error.message });
                });
        } catch (error) {
            return response.status(401).json({ message: 'Invalid token' });
        }
    }
    
    async update(request: Request, response: Response) {
        const productId = request.params.id;
        const { name, description, image, price, stock_quantity } = request.body;

        // Verifica se o token JWT está presente no cabeçalho da solicitação
        // const token = request.headers.authorization?.split(' ')[1];
        // if (!token) {
        //     return response.status(401).json({ message: 'Unauthorized' });
        // }

        try {
            // Extrai o payload do token JWT
            // const decodedToken: any = jwt.verify(token, 'yourSecretKey');
            // const user_id = decodedToken.id;
            const user_id = 2;

            // Query SQL para atualizar o produto
            const query = `UPDATE product 
                           SET name = '${name}', description = '${description}', image = '${image}', 
                               price = ${price}, stock_quantity = ${stock_quantity} 
                           WHERE id = ${productId} AND user_id = ${user_id}`;

            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then(() => {
                            connection.end();
                            response.status(200).json({ message: 'Product updated successfully' });
                        })
                        .catch((error) => {
                            connection.end();
                            response.status(500).json({ error: error.message });
                        });
                })
                .catch((error) => {
                    response.status(500).json({ error: error.message });
                });
        } catch (error) {
            response.status(401).json({ message: 'Invalid token' });
        }
    }

    async delete(request: Request, response: Response) {
        const productId = request.params.id;

        // Verifica se o token JWT está presente no cabeçalho da solicitação
        // const token = request.headers.authorization?.split(' ')[1];
        // if (!token) {
        //     return response.status(401).json({ message: 'Unauthorized' });
        // }

        try {
            // Extrai o payload do token JWT
            // const decodedToken: any = jwt.verify(token, 'yourSecretKey');
            // const user_id = decodedToken.id;
            const user_id = 2;

            // Query SQL para deletar o produto
            const query = `DELETE FROM product 
                           WHERE id = ${productId} AND user_id = ${user_id}`;

            Connect()
                .then((connection) => {
                    Query(connection, query)
                        .then(() => {
                            connection.end();
                            response.status(204).send();
                        })
                        .catch((error) => {
                            connection.end();
                            response.status(500).json({ error: error.message });
                        });
                })
                .catch((error) => {
                    response.status(500).json({ error: error.message });
                });
        } catch (error) {
            response.status(401).json({ message: 'Invalid token' });
        }
    }

}

export default new ProductController();
