import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { useApi } from '../../hooks/useApi';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';

type Props = {};

const AddDebt = (props: Props) => {
  const api = useApi();
  const { id } = useParams(); 
  const { token } = useContext(AuthContext);

  const [customerName, setCustomerName] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [customerToken, setCustomerToken] = useState<string>("");
  const [addDebt, setAddDebt] = useState<string>("");
  const [customerCategory, setCustomerCategory] = useState<string>("");
  const [customerCategoryId, setCustomerCategoryId] = useState<string>("");
  const [customerCellphone1, setCustomerCellphone1] = useState<string>("");
  const [customerCellphone2, setCustomerCellphone2] = useState<string>("");
  const [totalSpent, setTotalSpent] = useState<string>("");
  const [totalDebt, setTotalDebt] = useState<string>("");
  const [lastOrderDate, setLastOrderDate] = useState<string>("");
  const [lastOrderHour, setLastOrderHour] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    const getSingleCustomer = async (id: string | undefined) => {
      try {
        const singleCustomer = await api.getCustomerById(id); 
        setCustomerName(singleCustomer.name);
        setCustomerId(singleCustomer.customer_id);
        setCustomerToken(token || "");
        setCustomerCategoryId(singleCustomer.customerCategoryIdentification);
        setCustomerCellphone1(singleCustomer.cellphone1); 
        setCustomerCellphone2(singleCustomer.cellphone2); 
        setCustomerEmail(singleCustomer.email); 
        setTotalSpent(singleCustomer.totalSpent.toString());
        setTotalDebt(singleCustomer.totalDebt.toString());
        setLastOrderDate(singleCustomer.last_order_date);
        setLastOrderHour(singleCustomer.last_order_hour);
      } catch (err) {
        console.log(err);
      }
    }

    getSingleCustomer(id);
  }, []);

  const handleSaveUpdate = async () => {
    if (id) {
      try {
        const newDebt = parseFloat(totalDebt) + parseFloat(addDebt);          
        const updateCustomer = await api.updateCustomer(id, customerName, customerCategoryId, customerEmail, customerCellphone1, customerCellphone2, newDebt);
        setIsCreate(true);
      } catch (err) {
        console.log(err);
      }
    } 
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    handleSaveUpdate(); 
  };
  
  return (
    <form className="customerCategory-form">
      <label htmlFor="customerCategoryName">Quantidade a adicionar:</label>
      <input
        type="text"
        id="productName"
        name="productName"
        placeholder='Quantidade...'
        value={addDebt}
        onChange={e => setAddDebt(e.target.value)}
      />

      <button type="button" onClick={handleFormSubmit}>Adicionar saldo</button>
      {nameError && <p className="error-message">{nameError}</p>}
      {isCreate ? (
        <p>Saldo adicionado!</p>
      ) : <p className="error-message">{errorMessage}</p>}
    </form>
  );
};

export default AddDebt;
