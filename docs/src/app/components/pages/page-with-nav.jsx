let React = require('react');
let Router = require('react-router');
let RouteHandler = Router.RouteHandler;
let { Menu, Mixins, Styles } = require('material-ui');

let { Spacing, Colors } = Styles;
let { StyleResizable, StylePropable } = Mixins;


let PageWithNav = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    menuItems: React.PropTypes.array
  },

  getStyles: function(){
    let subNavWidth = Spacing.desktopKeylineIncrement * 3 + 'px';
    let styles = {
      root: {
        paddingTop: Spacing.desktopKeylineIncrement + 'px'
      },
      rootWhenMedium: {
        position: 'relative'
      },
      secondaryNav: {
        borderTop: 'solid 1px ' + Colors.grey300,
        overflow: 'hidden'
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px'
      },
      secondaryNavWhenMedium: {
        borderTop: 'none',
        position: 'absolute',
        top: '64px',
        width: subNavWidth
      },
      contentWhenMedium: {
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '800px'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
      styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  render: function() {
    let styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={styles.content}>
          <RouteHandler />
        </div>
        <div style={styles.secondaryNav}>
          <Menu
            ref="menuItems"
            zDepth={0}
            menuItems={this.props.menuItems}
            selectedIndex={this._getSelectedIndex()}
            onItemTap={this._onMenuItemClick} />
        </div>
      </div>
    );
  },

  _getSelectedIndex: function() {
    let menuItems = this.props.menuItems;
    let currentItem;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  },

  _onMenuItemClick: function(e, index, item) {
    this.context.router.transitionTo(item.route);
  }

});

module.exports = PageWithNav;
