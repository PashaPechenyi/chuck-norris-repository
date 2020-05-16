import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Form.scss";

export class Form extends Component {
  static propTypes = {
    activeSelectRadio: PropTypes.string,
    activeCategory: PropTypes.string,
    searchValue: PropTypes.string,
    change_activeCategory: PropTypes.func,
    change_activeSelectRadio: PropTypes.func,
    change_searchValue: PropTypes.func,
    addJoke: PropTypes.func,
  };
  static defaultProps = {
    activeSelectRadio: "random",
    activeCategory: "",
    searchValue: "",
    change_activeCategory: () => {},
    change_activeSelectRadio: () => {},
    change_searchValue: () => {},
    addJoke: () => {},
  };

  state = {
    categories: [],
  };

  componentDidMount() {
    const { change_activeCategory } = this.props;
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          categories: data,
        });
        change_activeCategory(data[0]);
      })
      .catch((error) => error);
  }

  render() {
    const { categories } = this.state;
    const {
      activeSelectRadio,
      activeCategory,
      searchValue,
      change_activeCategory,
      change_activeSelectRadio,
      change_searchValue,
      addJoke,
    } = this.props;

    return (
      <div className="searchBlock_form">
        
        <p className="msi">MSI 2020</p>
        <h2 className="hey">Hey!</h2>
        <h3 className="letsTry">Let's try to find a joke for you:</h3>

        <form className="searchForm">
          <label>
            <input
              type="radio"
              name="selectJoke"
              value="random"
              onChange={change_activeSelectRadio}
              checked={activeSelectRadio === "random"}
            />
            Random
          </label>
          <br />

          <label>
            <input
              type="radio"
              name="selectJoke"
              value="categories"
              onChange={change_activeSelectRadio}
              checked={activeSelectRadio === "categories"}
            />
            From categories
          </label>
          <br />

          {/* Block with Categories  */}
          {activeSelectRadio === "categories" && (
            <div className="jokesCategories_block">
              {categories.map((category) => (
                <span
                  key={category}
                  className={
                    activeCategory === category
                      ? "jokesCategories jokesCategories_active"
                      : "jokesCategories"
                  }
                  onClick={() => {
                    change_activeCategory(category);
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          <label>
            <input
              type="radio"
              name="selectJoke"
              value="search"
              onChange={change_activeSelectRadio}
              checked={activeSelectRadio === "search"}
            />
            Search
          </label>
          <br />

          {activeSelectRadio === "search" && (
            <input
              type="text"
              placeholder="Free text search..."
              value={searchValue}
              onChange={change_searchValue}
            />
          )}

          <button className="submitButton" onClick={addJoke}>
            Get a joke
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {};

export default Form;
