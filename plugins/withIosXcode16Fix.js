const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withIosXcode16Fix(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let content = fs.readFileSync(podfilePath, 'utf-8');

      if (content.includes('FMT_ENFORCE_COMPILE_STRING=0')) {
        return config;
      }

      const xcode16Fix = `
    # --- FORCE XCODE 16 FIX ---
    installer.pods_project.targets.each do |target|
      if target.name == 'fmt'
        target.build_configurations.each do |config|
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)']
          config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] << 'FMT_ENFORCE_COMPILE_STRING=0'
        end
      end
    end
      `;

      // We look for the line where Expo starts its own post_install logic
      // and we insert our fix right after it starts.
      const searchString = /post_install do \|installer\|/g;
      
      if (searchString.test(content)) {
        content = content.replace(searchString, `post_install do |installer|\n${xcode16Fix}`);
        fs.writeFileSync(podfilePath, content);
      } else {
        console.warn("Could not find post_install block in Podfile to apply Xcode 16 fix.");
      }

      return config;
    },
  ]);
};