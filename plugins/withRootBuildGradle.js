// const { withDangerousMod } = require('@expo/config-plugins');
// const fs = require('fs');
// const path = require('path');

// module.exports = function withRootBuildGradle(config) {
//   return withDangerousMod(config, [
//     'android',
//     async (config) => {
//       const buildGradlePath = path.join(
//         config.modRequest.platformProjectRoot,
//         'build.gradle'
//       );
//       let contents = fs.readFileSync(buildGradlePath, 'utf-8');
//       const patch = `\nallprojects {\n  ext.expoProvidesDefaultConfig = true\n}\n`;
//       if (!contents.includes('expoProvidesDefaultConfig')) {
//         contents += patch;
//         fs.writeFileSync(buildGradlePath, contents);
//       }
//       return config;
//     },
//   ]);
// };


const { withProjectBuildGradle, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withRootBuildGradle(config) {
  // 1. Force AGP and Kotlin versions in build.gradle
  config = withProjectBuildGradle(config, (config) => {
    let contents = config.modResults.contents;

    // Force AGP 8.9.1
    const targetAGP = "classpath('com.android.tools.build:gradle')";
    const versionedAGP = "classpath('com.android.tools.build:gradle:8.9.1')";
    if (contents.includes(targetAGP)) {
      contents = contents.replace(targetAGP, versionedAGP);
    }

    // Force Kotlin 2.0.21 (Safest version for current Stripe/RN compatibility)
   const targetKotlin = "classpath('org.jetbrains.kotlin:kotlin-gradle-plugin')";
    const versionedKotlin = "classpath('org.jetbrains.kotlin:kotlin-gradle-plugin:2.1.10')";
    if (contents.includes(targetKotlin)) {
      contents = contents.replace(targetKotlin, versionedKotlin);
    }

    config.modResults.contents = contents;
    return config;
  });

  // 2. Ensure the SDK 36 suppression flag is in gradle.properties
  return withDangerousMod(config, [
    'android',
    async (config) => {
      const propsPath = path.join(
        config.modRequest.platformProjectRoot,
        'gradle.properties'
      );
      let props = fs.readFileSync(propsPath, 'utf-8');

      if (!props.includes('android.suppressUnsupportedCompileSdk=36')) {
        props += '\nandroid.suppressUnsupportedCompileSdk=36\n';
        fs.writeFileSync(propsPath, props);
      }
      return config;
    },
  ]);
};