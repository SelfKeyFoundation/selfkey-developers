const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    SelfKey Developers
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
          <p>
            Learn more about technical implementation of SelfKey projects.  Developer support for integrating with the SelfKey Identity Wallet, SelfKey Connect Browser Extension and SelfKey Marketplace.  
          </p>
          <p>
            Enable one-click KYC document submission, private key based passwordless authentication systems and more.
          </p>
          <PromoSection>
            <Button href={docUrl('getting-started/selfkey-intro.html', language)}>Learn More</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content:'Read about SelfKey Projects including technical information and implementation guidelines to integrate your apps with SelfKey projects.' ,
        title: 'Developer Documentation',
        image: '/img/docs.png',
        imageAlign: 'top',
        imageAlt: 'React'
      },
      {
        content:'Take advantage of developer resources available for download including integration libraries for the most popular languages and frameworks.' ,
        title: 'Integration Resources',
        image: '/img/download.png',
        imageAlign: 'top',
        imageAlt: 'Integration Resources'
      },
      {
        content: 'Get in touch with the SelfKey development team who can help with questions about how to use the developer integration resources available here.',
        title: 'Help and Support',
        image: '/img/support.png',
        imageAlign: 'top',
        imageAlt: 'Help and Support'
      }
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>Start Integrating with SelfKey Now</h2>
    <MarkdownBlock>Start reading the developer documentation and download integeration resources for your specific tech stack.</MarkdownBlock>
    <PromoSection>
        <Button href={docUrl('getting-started/selfkey-intro.html')}>Get Started Now</Button>
    </PromoSection>
  </div>
);

const LearnHow = props => (
  <Block background="dark">
    {[
      {
        content: 'The KEY token is an Ethereum ERC-20 compliant cryptographic token used for access rights and proof of reputation within the SelfKey Network. The KEY token is a trust mechanism that allows participants to exchange value within the SelfKey Ecosystem.  Trust and reputation are the basic pillars of any identity system and mechanisms should be in place to incentivize good practices and behaviour, and avoid identity fraud, false attestations or misuse of identity data. Using Smart contracts technology, the KEY Token enables such mechanisms to eliminate any potential threat that could jeopardize confidence deposited by participants in the SelfKey Identity System.',
        image: imgUrl('key.png'),
        imageAlign: 'right',
        title: 'Learn about The KEY Token, Marketplace and more',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: 'Securely access your ID assets and documents, verify and notarize them through qualified certifiers and share them with relying parties listed on the SelfKey Marketplace to access their products and services quickly.  Manage your cryptocurrency portfolio, receiving and sending ETH, KEY and any ERC-20 token.',
        image: imgUrl('idw.png'),
        imageAlign: 'left',
        title: 'Access KYC Data with the SelfKey Identity Wallet',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="light">
    {[
      {
        content: 'At SelfKey, we are enabling another instant sign up option: The Log in with SelfKey Button & Browser Extension. The browser extension will be connected to your Identity wallet and will allow to instantly sign up/in to Products and Services through the LWS Button, which will be placed in the Service Provider’s website. Once you have created your SelfKey ID using your SelfKey Wallet, and installed the SelfKey extension in your browser, you will simply have to press the LWS Button and allow the Service Provider to access your identity data.',
        image: imgUrl('lws.png'),
        imageAlign: 'right',
        title: 'Integrate Login with SelfKey Authentication',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} alt={user.caption} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using SelfKey?"}</h2>
      <p>Some of the blockchain companies using SelfKey projects</p>
      <div className="logos">{showcase}</div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
