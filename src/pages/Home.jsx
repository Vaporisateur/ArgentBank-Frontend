import React from "react";
import iconChat from "../assets/img/icon-chat.webp";
import iconMoney from "../assets/img/icon-money.webp";
import iconSecurity from "../assets/img/icon-security.webp";
import bankTree from "../assets/img/bank-tree.webp";
import FeatureItem from "../components/FeatureItem";

function Home() {
  return (
    <>
      <main className="main">
        <div className="hero">
          <img
            src={bankTree}
            alt="A tree representing financial growth"
            className="hero-image"
          />
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            icon={iconChat}
            alt="Chat Icon"
            title="You are our #1 priority"
          >
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </FeatureItem>
          <FeatureItem
            icon={iconMoney}
            alt="Money Icon"
            title="More savings means higher rates"
          >
            The more you save with us, the higher your interest rate will be!
          </FeatureItem>
          <FeatureItem
            icon={iconSecurity}
            alt="Security Icon"
            title="Security you can trust"
          >
            We use top of the line encryption to make sure your data and money
            is always safe.
          </FeatureItem>
        </section>
      </main>
    </>
  );
}

export default Home;