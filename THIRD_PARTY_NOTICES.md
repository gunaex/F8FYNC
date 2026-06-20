# Third Party Notices

## astronomy-engine

- Package: `astronomy-engine`
- Version: `2.1.19`
- Author: Donald Cross
- License: MIT
- Purpose: build-time astronomical solar-term generation for the versioned F8SYNC local dataset

The package is used by `scripts/generate-solar-terms.ts` to calculate UTC instants for solar terms via `SearchSunLongitude`. Application runtime reads the generated local dataset and does not call Astronomy Engine.

MIT License

Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the conditions in the full MIT license distributed with the package.

