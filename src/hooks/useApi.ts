import axios from 'axios';

const api = axios.create({
    baseURL: "api-link.com"
});

export const useApi = () => ({
    verifyToken: async (token: string) => { 
        try {
            const response = await api.get('/verifyToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao verificar o token:", err);
            return { success: false, error: "Erro ao verificar o token. Por favor, tente novamente."};
        }
    },
    authenticateUser: async (email: string, password: string) => {
        try {
            const response = await api.post('/auth', { email, password });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao entrar na sua conta:", err);
            return { success: false, error: "Não foi possível logar. Por favor, tente novamente."};
        }
    },
    createCustomerCategory: async (name: string, description: string, customers: any[]) => {
        try {
            const response = await api.post('/customercategory', { 
                name, description, customers,
                }, 
            );
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar o cliente:", err);
            return { success: false, error: "Não foi possível criar o cliente. Por favor, tente novamente."};
        }
    },
    getAllCustomerCategories: async () => {
        const response = await api.get('/customercategory', {
        });
        return response.data;
    },
    getCustomerCategoryById: async (id: string | undefined) => {
        const response = await api.get(`/customercategory/${id}`, {
        });
        return response.data;
    },
    deleteCustomerCategoryById: async (id: string | undefined) => {
        const response = await api.delete(`/customercategory/${id}`);
        return response.data;
    },
    createCategory: async (name: string, description: string, products: any[]) => {
        try {
            const response = await api.post('/category', { 
                name, description, products,
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar a categoria:", err);
            return { success: false, error: "Não foi possível criar a categoria. Por favor, tente novamente."};
        }
    },
    getAllCategories: async () => {
        const response = await api.get('/category');
        return response.data;
    },
    getCategoryById: async (id: string | undefined) => {
        const response = await api.get(`/category/${id}`);
        return response.data;
    },
    deleteCategoryById: async (id: string | undefined) => {
        const response = await api.delete(`/category/${id}`);
        return response.data;
    },
    getAllCustomers: async () => { 
        const response = await api.get('/customer');
        return response.data;
    },
    getCustomerById: async (id: string | undefined) => {
        const response = await api.get(`/customer/${id}`);
        return response.data;
    },
    getCustomersByCategory: async (id: string | undefined) => {
        const response = await api.get(`/customer/findcustomerbycategory/${id}`);
        return response.data;
    },    
    deleteCustomerById: async (id: string | undefined) => {
        const response = await api.delete(`/customer/${id}`);
        return response.data;
    },
    createCustomer: async (name: string, customer_category_id: string, email: string, cellphone1: string, cellphone2: string) => {
        try {
            const response = await api.post('/customer', {
                name,
                customercategory: {
                    customer_category_id
                },
                email,
                cellphone1,
                cellphone2,
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar o cliente:", err);
            return { success: false, error: "Não foi possível criar o cliente. Por favor, tente novamente."};
        }
    },
    updateCustomer: async (id: string, name: string, customer_category_id: string, email: string, cellphone1: string, cellphone2: string, totalDebt: number) => {
        try {
            const response = await api.put(`/customer/${id}`, {
                name,
                customercategory: {
                    customer_category_id
                },
                email,
                cellphone1,
                cellphone2,
                totalDebt
            },);
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao atualizar o cliente:", err);
            return { success: false, error: "Não foi possível atualizar o cliente. Por favor, tente novamente."};
        }
    },
    getAllProducts: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    getProductById: async (id: string | undefined) => {
        const response = await api.get(`/product/${id}`);
        return response.data;
    },
    getProductsByCategory: async (id: string | undefined) => {
        const response = await api.get(`/product/findproductbycategory/${id}`);
        return response.data;
    },       
    createProduct: async function(name: string, category_id: string, description: string, brand: string, stock: number, cost: number, price: number)  {
        try {
            const response = await api.post('/product', {
                name,
                description,                
                brand,
                stock,
                category: {
                    category_id
                },
                price,
                cost,
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar o cliente:", err);
            return { success: false, error: "Não foi possível criar o cliente. Por favor, tente novamente." };
        }
    },
    updateProduct: async (id: string, name: string, categoryName: string, category_id: string, description: string, brand: string, stock: number, cost: number, price: number) => {
        try {
            const response = await api.put(`/product/${id}`, {
                name,
                description,                
                brand,
                stock,
                category: {
                    category_id
                },
                categoryName,
                price,
                cost,
            },);
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao atualizar o produto:", err);
            return { success: false, error: "Não foi possível atualizar o produto. Por favor, tente novamente."};
        }
    },
    deleteProductById: async (id: string | undefined) => {
        const response = await api.delete(`/product/${id}`);
        return response.data;
    },
    getAllOrders: async () => {
        const response = await api.get('/order');
        return response.data;
    }, 
    getOrderById: async (id: string | undefined) => {
        const response = await api.get(`/order/${id}`);
        return response.data;
    },    
    getOrdersByCustomer: async (id: string | undefined) => {
        const response = await api.get(`/order/findbycustomer/${id}`);
        return response.data;
    },    
    getOrdersByProduct: async (id: string | undefined) => {
        const response = await api.get(`/order/findbyorder/${id}`);
        return response.data;
    },
    createOrder: async (orderData: any) => {
        try {
            const response = await api.post('/order', orderData);
              return { success: true, data: response.data };
        } catch (err) {
            console.log("Erro ao criar o pedido", err);
            return { success: false, error: "Não foi possível criar o pedido. Por favor, tente novamente.", err };
        }
    },              
    deleteOrderById: async (id: string | undefined) => {
        const response = await api.delete(`/order/${id}`);
        return response.data;
    },
    createSale: async (customer_id: string, product_id: string, stock: number) => {
        try {
            const response = await api.post('/sale', {
                customer: {
                    customer_id
                },                
                product: {
                    product_id
                },
                stock: stock
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar o cliente:", err);
            return { success: false, error: "Não foi possível criar o cliente. Por favor, tente novamente."};
        }
    },
    deleteSaleById: async (id: string | undefined) => {
        const response = await api.delete(`/sale/${id}`);
        return response.data;
    },
    getSalesByOrder: async (id: string | undefined) => {
        const response = await api.get(`/sale/findsalesbyorder/${id}`);
        return response.data;
    }, 
    getAllTransactions: async () => {
        const response = await api.get('/transaction');
        return response.data;
    }, 
    getTransactionById: async (id: string | undefined) => {
        const response = await api.get(`/transaction/${id}`);
        return response.data;
    },
    createTransaction: async (name: string, status: boolean, totalValue: number) => {
        try {
            const response = await api.post('/transaction', { 
                name, status, totalValue,
            });
            return { success: true, data: response.data };
        } catch (err) {
            console.error("Erro ao criar a transação:", err);
            return { success: false, error: "Não foi possível criar a transação. Por favor, tente novamente."};
        }
    },
    deleteTransactionById: async (id: string | undefined) => {
        const response = await api.delete(`/transaction/${id}`);
        return response.data;
    },
});
 