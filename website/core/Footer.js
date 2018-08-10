/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                height="60"
              />
            )}
          </a>
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('selfkey-intro.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('marketplace-intro.html', this.props.language)}>
              Marketplace Integration
            </a>
            <a href={this.docUrl('lws-intro.html', this.props.language)}>
              Login with Selfkey
            </a>
            <a href={this.docUrl('json-schema-intro.html', this.props.language)}>
              Additional Projects
            </a>
          </div>
          <div>
            <h5>Resources</h5>
            <a href={this.pageUrl('resources.html', this.props.language)}>
              View All Resources
            </a>
            <a href={this.pageUrl('lws-nodejs.html', this.props.language)}>
              NodeJS SDK
            </a>
            <a
              href="https://twitter.com/SelfKeyDevelopers"
              target="_blank"
              rel="noreferrer noopener">
              Selfkey Developer Twitter
            </a>
          </div>
          <div>
            <h5>More</h5>
            <a href={this.props.config.baseUrl + 'blog'}>SelfKey Developer Blog</a>
            <a href="https://github.com/SelfKeyFoundation">SelfKey GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/SelfKeyFoundation/Identity-Wallet"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>

        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
