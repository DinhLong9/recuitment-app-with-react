import React from "react";
import "./styles.scss";
import SearchForm from "./SearchForm";
import ListTag from "./ListTags";
import ListCompany from "./ListCompany";

export default function Home() {
  return (
    <>
      <div className="home">
        <SearchForm />
        <ListTag />
        <ListCompany />
      </div>
    </>
  );
}
