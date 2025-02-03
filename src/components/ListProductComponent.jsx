import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Fungsi untuk mengambil data produk
        ProductService.getProducts().then(res => {
            setProducts(res.data);
        });
    }, []);

    const deleteProduct = (id) => {
        ProductService.deleteProduct(id).then(res => {
            setProducts(products.filter(product => product.id !== id));
        });
    };

    const viewProduct = (id) => {
        history.push(`/view-product/${id}`);
    };

    const editProduct = (id) => {
        history.push(`/add-product/${id}`);
    };

    const addProduct = () => {
        history.push('/add-product/_add');
    };

    return (
        <div>
            <h2 className="text-center">Products List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addProduct}> Add Product</button>
            </div>
            <br />
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> Price</th>
                            <th> Description</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product =>
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <button onClick={() => editProduct(product.id)} className="btn btn-info">Update</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                                        <button style={{ marginLeft: "10px" }} onClick={() => viewProduct(product.id)} className="btn btn-info">View</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProductComponent;
