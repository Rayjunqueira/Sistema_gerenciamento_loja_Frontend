import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useApi } from '../../hooks/useApi';
import { UUID } from 'crypto';

type Customer = {
  customer_id: UUID;
  name: string;
  category: string;
  cellphone1: string;
  cellphone2: string;
  email: string;
};

type Order = {
  order_id: UUID;
  customer_id: UUID;
  customerName: string;
  orderNumber: string;
  sales: [];
  totalAmount: number;
  totalDebt: number;
  profit: number;
  totalcost: string;
  createdAt: string;
};

type Props = {}

const SingleCustomer = (props: Props) => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const api = useApi();

  const [customerName, setCustomerName] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [customerToken, setCustomerToken] = useState<string>("");
  const [customerCategory, setCustomerCategory] = useState<string>("");
  const [customerCellphone1, setCustomerCellphone1] = useState<string>("");
  const [customerCellphone2, setCustomerCellphone2] = useState<string>("");
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [totalDebt, setTotalDebt] = useState<number>(0);
  const [lastOrderDate, setLastOrderDate] = useState<string>("");
  const [lastOrderHour, setLastOrderHour] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [orders, setOrders] = useState<Order[] | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log('Orders:', orders);
  }, [orders]);
  

  useEffect(() => {
    const getCustomer = async (id: string | undefined) => {
      try { 
        if (id !== undefined) {
          const customer = await api.getCustomerById(id);
          setCustomerName(customer.name);
          setCustomerId(customer.customer_id);
          setCustomerToken(token || "");
          setCustomerCategory(customer.category);
          setCustomerCellphone1(customer.cellphone1); 
          setCustomerCellphone2(customer.cellphone2); 
          setCustomerEmail(customer.email); 
          setTotalSpent(customer.totalSpent);
          setTotalDebt(customer.totalDebt);
          setLastOrderDate(customer.last_order_date);
          setLastOrderHour(customer.last_order_hour);
        } 
      } catch (err) {
        console.log(err); 
      }     
    } 

    getCustomer(id);
  }, [id]); 

  const compareDates = (a: Order, b: Order) => {
    const dateA = new Date(a.createdAt) as any;
    const dateB = new Date(b.createdAt) as any;

    return dateB - dateA;
  };
  
  useEffect(() => {
    const getOrdersByCust = async () => {
      try {
        const orders = await api.getOrdersByCustomer(id);
        const reverseOrders = orders.sort(compareDates);
        setOrders(reverseOrders);
        setFilteredOrders(reverseOrders); 
      } catch (err) {
        console.log(err);
      }
    };
  
    getOrdersByCust();
  }, [id]);
  

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString); 
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  const handleSingleOrder = (id: string) => {
    navigate(`/singleorder/${id}`);
  };

  const handleAddDebt = (id: string) => {
    navigate(`/adddebt/${id}`);
  };

  const handleRemoveDebt = (id: string) => {
    navigate(`/removedebt/${id}`);
  };

  const handleDeleteCustomer = async (id: string | undefined) => {
    if (id) {
      await api.deleteCustomerById(id);
      navigate(`/customers`);
    }
  };
   
  return (
    <div>
      <div className="table-container">
        <table className="customer-table">
          <tbody>
            <tr>
              <td className="label">Nome:</td>
              <td className="value">{customerName}</td>
            </tr>
            <tr>
              <td className="label">Categoria:</td>
              <td className="value">{customerCategory}</td>
            </tr>
            <tr>
              <td className="label">Telefone:</td>
              <td className="value">{customerCellphone1}</td>
            </tr>
            <tr>
              <td className="label">Telefone 2:</td>
              <td className="value">
                {customerCellphone2 && customerCellphone2.length === 0 ? 'Não registrado' : `${customerCellphone2}`}
              </td>
            </tr>
            <tr>
              <td className="label">Email:</td>
              <td className="value">
                {customerEmail && customerEmail.length === 0 ? 'Não registrado' : `${customerEmail}`}
              </td>
            </tr>
            <tr>
              <td className="label">Gasto total:</td>
              <td className="value">R$ {totalSpent.toFixed(2)}</td>
            </tr>
            <tr> 
              <td className="label">Saldo Devedor:</td>
              <td className="value"> 
                {`R$ ${totalDebt.toFixed(2)}`}
              </td>
            </tr>
            <tr>
              <td className="label">Pedidos completos:</td>
              <td className="value">
                {Array.isArray(orders) && orders.length
                  ? `${orders.length}`
                  : 'Não houve pedidos ainda'}
              </td>
            </tr>
            <tr>
              <td className="label">Data último pedido:</td>
              <td className="value">
              {orders && Array.isArray(orders) && orders.length === 0
                ? 'Não houve pedidos ainda'
                : lastOrderDate && lastOrderHour
                  ? `${formatDate(lastOrderDate)} às ${lastOrderHour}`
                  : 'Data desconhecida'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="removeEditContainer">
        <div>
          <button id="delete" onClick={() => handleDeleteCustomer(customerId)}>
            Deletar
          </button>
        </div>
        <button id="edit" onClick={() => handleAddDebt(customerId)}>
          Add saldo devedor
        </button>
        <button id="edit" onClick={() => handleRemoveDebt(customerId)}>
          Remover saldo devedor
        </button>
      </div>      
      <div className="recentOrders">
        <h3>Pedidos Recentes de {customerName}</h3>
      </div>
      <div className="tableOrders">
        {Array.isArray(currentOrders) && currentOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th scope="col">N de pedido</th>
                <th scope="col">Cliente</th>
                <th scope="col">Data</th>
                <th scope="col">Valor total</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  key={order.order_id}
                  onClick={() => handleSingleOrder(order.order_id)}
                >
                  <td data-label="N DE PEDIDO">{order.orderNumber}</td>
                  <td data-label="CLIENTE">{order.customerName}</td>
                  <td data-label="DATA">{formatDate(order.createdAt)}</td>
                  <td data-label="VALOR TOTAL">
                    R${order.totalAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="noOrdersMessage">
            <p>Não há pedidos para exibir.</p>
          </div>
        )}      
    <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      </div>
    </div>
  )
}

export default SingleCustomer;