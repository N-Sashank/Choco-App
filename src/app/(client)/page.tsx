"use client";
import Hero from "./client-components/hero";
import Newsletter from "./client-components/Newsletter";
import Footer from "./client-components/footer";
import Section1 from "./client-components/Section1";
import Header from "./client-components/header";
import Products_section from "./client-components/products_section";
export default function Home() {
  return (
    <>
      <div className="bg-white transition">
        <Header />
        <Hero />
        <Section1 />
        <section id="products-section">
          {" "}
          <Products_section />
        </section>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
