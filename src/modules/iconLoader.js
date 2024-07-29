const iconContext = require.context('../assets/icons', false, /\.svg$/);
const icons = {};

iconContext.keys().forEach(key => {
  const iconName = key.replace('./', '').replace('.svg', '');
  icons[iconName] = iconContext(key);
});

export default icons;
