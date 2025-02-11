import React from "react";
import "../css/congoAgent.css"; // Import the CSS file

const CongoAgent = () => {
  return (
    <div className="congo-agent-container">
      
      {/* Banner Section */}
      <div className="banner">
        <img
          src={`${process.env.PUBLIC_URL}/images/localServices/congoBanner.png`}
          alt="Congo Agent Banner"
          className="banner-image"
        />
      </div>

      <h1 class="main-title">
       Une Relation de Confiance Établie
      </h1>

   

      <section className="intro-container">
        
        <div class="intro-content">
          <p>
            Depuis plus de 7 ans, notre partenariat repose sur une confiance mutuelle et une expertise solide, garantissant un service de qualité pour nos clients à Kinshasa et ses environs.
          </p>
          <img alt="Image of a ship and containers" src={`${process.env.PUBLIC_URL}/images/localServices/smallbanner2.png`} />
        </div>
      </section>

              
      <section className="agent-section">
        <div className="background congo-agent">
              <div className="services-text">
                  <span><strong>SERVICES FIABLES DE DÉDOUANEMENT ET
                                D'IMPORTATION AU PORT DE MATADI<br /></strong></span>
                  <span>Dégagement de conteneur<br /></span>
                  <span>Dédouanement Immatriculation<br /> </span>
                  <span>et même une consultation gratuite<br /></span>
                  <span>avec un expert dans l'importation <br/></span>
                  <span>de véhicule et les pièces de rechange</span>
              </div>
        </div>

      </section>

      {/* Services Section */}

      <section id="services" className="section-container">
        <h1 class="section-title">
          Services d'expédition de conteneurs        
        </h1>
        <div class="services">
          <h2>
          1. Livraison Fiable et Sécurisée
          </h2>
          <p>
            Nous assurons une livraison rapide et sécurisée de vos véhicules à Kinshasa et dans ses 
            environs. Grâce à notre expertise logistique, vos commandes arrivent toujours dans les 
            délais convenus et en parfait état.
          </p> 
          <h2>
          2. Dégagement de Conteneurs à Tarifs Compétitifs
          </h2>
          <p>
          • Bénéficiez des tarifs les plus compétitifs du marché pour le dégagement de vo
          conteneurs, tout en profitant d’un service de qualité et d’une efficacité optimale.

          </p>
          <h2>
            3. Dédouanement Efficace et Abordabble

          </h2>
          <p>
          • Nous proposons un service de dédouanement rapide et conforme aux réglementations 
          locales, au meilleur prix du marché.
          </p>
          <h2>
          4. Partage de Conteneur pour Réduire Vos Coûts
          </h2>
          <p>
          • Optimisez vos dépenses grâce à notre service de partage de conteneurs, parfaitement 
            adapté aux petites commandes, tout en assurant une gestion Efficace          
          </p>
          <h2>
          5. Assistance Personnalisée à Chaque Étape
          </h2>
          <p>
          • De l’importation à la livraison, notre équipe vous accompagne avec des solutions sur 
          mesure pour simplifier vos opérations logistiques et garantir une expérience sans souci.        
          </p>
        </div>
      </section>
     {/* 
              <div className="services">
            <div className="service">
                <i className="fas fa-shield-alt"></i>
                <div>
                    <h2>Livraison Fiable et Sécurisée</h2>
                    <p>Nous assurons une livraison rapide et sécurisée de vos véhicules à Kinshasa et dans ses 
                      environs. Grâce à notre expertise logistique, vos commandes arrivent toujours dans les 
                      délais convenus et en parfait état.
                    </p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-chart-line"></i>
                <div>
                    <h2>Dédouanement Efficace et Abordable</h2>
                    <p>Nous proposons un service de dédouanement rapide et conforme aux réglementations locales, au meilleur prix du marché.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-box"></i>
                <div>
                    <h2>Partage de Conteneur pour Réduire Vos Coûts</h2>
                    <p>Optimisez vos dépenses grâce à notre service de partage de conteneurs, parfaitement adapté aux petites commandes, tout en assurant une gestion efficace.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-truck-loading"></i>
                <div>
                    <h2>Dégagement de Conteneurs à Tarifs Compétitifs</h2>
                    <p>Bénéficiez des tarifs les plus compétitifs du marché pour le dégagement de vos conteneurs, tout en profitant d’un service de qualité et d’une efficacité optimale.</p>
                </div>
            </div>
            <div className="service">
                <i className="fas fa-headset"></i>
                <div>
                    <h2>Assistance Personnalisée à Chaque Étape</h2>
                    <p>De l’importation à la livraison, notre équipe vous accompagne avec des solutions sur mesure pour simplifier vos opérations logistiques et garantir une expérience sans souci.</p>
                </div>
            </div>
        </div>
     */}


      {/* Automated Invoice System Section */}
      <div className="invoice-section">
        <h2>Générez Vos Factures en Toute Simplicité</h2>
        <p>
          Simplifiez vos transactions grâce à notre système automatisé de facturation :
        </p>
        <ul>
          <li>Rapide et Facile : Créez, modifiez et téléchargez vos factures en quelques clics.</li>
          <li>Multi-Devises : Générez des factures dans la devise de votre choix pour faciliter vos paiements internationaux.</li>
          <li>Descriptions Claires pour les Banques : Ajustez les descriptions pour répondre aux exigences bancaires, garantissant un traitement fluide de vos paiements.</li>
        </ul>
        <a href="#invoice" className="invoice-link">
          Accédez au Générateur de Factures Automatisées
        </a>
      </div>

      <section className="contact-section-container">
        <div class="contact">
          <div className='contact-text'>
          <h2>
            Contactez Notre Partenaire Local
          </h2>
          <p>
            Pour plus de détails sur nos services de partage de conteneur, contactez notre partenaire <strong>Agence R.T.A</strong> au port de Matadi.<br/>
            Mr Pascal Masamba<br />
            WhatsApp: +243 891 655 033
          </p>
          </div>
          <img alt="Image of a handshake and a ship with containers"  src={`${process.env.PUBLIC_URL}/images/localServices/partner.png`}/>
        </div>
      </section>

    </div>
  );
};

export default CongoAgent;