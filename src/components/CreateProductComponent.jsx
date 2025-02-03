import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const CreateProductComponent = () => {
    const { id } = useParams();
    const history = useHistory();
    
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: ''
    });

    useEffect(() => {
        if (id !== '_add') {
            ProductService.getProductById(id).then((res) => {
                const product = res.data;
                setProduct({
                    name: product.name,
                    price: product.price,
                    description: product.description
                });
            });
        }
    }, [id]);

    const saveOrUpdateProduct = (e) => {
        e.preventDefault();
        console.log('product => ' + JSON.stringify(product));

        if (id === '_add') {
            ProductService.createProduct(product).then(() => {
                history.push('/products');
            });
        } else {
            ProductService.updateProduct(product, id).then(() => {
                history.push('/products');
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const cancel = () => {
        history.push('/products');
    };

    const getTitle = () => {
        return id === '_add' ? (
            <h3 className="text-center">Add Product</h3>
        ) : (
            <h3 className="text-center">Update Product</h3>
        );
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input
                                        placeholder="Name"
                                        name="name"
                                        className="form-control"
                                        value={product.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price:</label>
                                    <input
                                        placeholder="Price"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <input
                                        placeholder="Description"
                                        name="description"
                                        className="form-control"
                                        value={product.description}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateProduct}>
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={cancel}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProductComponent;
