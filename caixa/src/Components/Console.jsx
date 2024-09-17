import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Console.module.css";
function Console() {
  return (
    <div className={styles.container}>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.active : styles.navlink
        }
        to="/"
      >
        Pedidos
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? styles.active : styles.navlink
        }
        to="/history"
      >
        Histórico de pedidos
      </NavLink>
    </div>
  );
}

export default Console;
