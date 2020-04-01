@ECHO OFF

SET V20XP="C:\Program Files\Microsoft Visual Studio 8\SDK\v2.0\Bin\sn.exe"
SET V35XP="C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin\sn.exe"
SET V40XP="C:\Program Files\Microsoft SDKs\Windows\v7.1\Bin\NETFX 4.0 Tools\sn.exe"

SET V20Win7="C:\Program Files (x86)\Microsoft Visual Studio 8\SDK\v2.0\Bin\sn.exe"
SET V35Win7="C:\Program Files (x86)\Microsoft SDKs\Windows\v7.0A\Bin\sn.exe"
SET V40Win7="C:\Program Files (x86)\Microsoft SDKs\Windows\v8.0A\bin\NETFX 4.0 Tools\sn.exe"
SET V451Win7="C:\Program Files (x86)\Microsoft SDKs\Windows\v8.1A\bin\NETFX 4.5.1 Tools\sn.exe"
SET V46Win7="C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.6 Tools\sn.exe"
SET V461Win7="C:\Program Files (x86)\Microsoft SDKs\Windows\v10.0A\bin\NETFX 4.6.1 Tools\sn.exe"

IF EXIST %V20XP% (
SET SNEXE=%V20XP%
) ELSE IF EXIST %V35XP% (
SET SNEXE=%V35XP%
) ELSE IF EXIST %V40XP% (
SET SNEXE=%V40XP%
) ELSE IF EXIST %V20Win7% (
SET SNEXE=%V20Win7%
) ELSE IF EXIST %V35Win7% (
SET SNEXE=%V35Win7%
) ELSE IF EXIST %V40Win7% (
SET SNEXE=%V40Win7%
) ELSE IF EXIST %V451Win7% (
SET SNEXE=%V451Win7%
) ELSE IF EXIST %V46Win7% (
SET SNEXE=%V46Win7%
) ELSE IF EXIST %V461Win7% (
SET SNEXE=%V461Win7%
) ELSE (
GOTO End
)

IF EXIST RasterEdge.Imaging.Font.dll (
%SNEXE% -vf RasterEdge.Imaging.Font.dll
%SNEXE% -T RasterEdge.Imaging.Font.dll
) ELSE (
ECHO ==== RasterEdge.Imaging.Font.dll is missing
)

IF EXIST RasterEdge.XImage.Raster.Core.dll (
%SNEXE% -vf RasterEdge.XImage.Raster.Core.dll
%SNEXE% -T RasterEdge.XImage.Raster.Core.dll
)

IF EXIST RasterEdge.XImage.OCR.Tesseract.dll (
%SNEXE% -vf RasterEdge.XImage.OCR.Tesseract.dll
%SNEXE% -T RasterEdge.XImage.OCR.Tesseract.dll
)

IF EXIST RasterEdge.XImage.AdvancedCleanup.Core.dll (
%SNEXE% -vf RasterEdge.XImage.AdvancedCleanup.Core.dll
%SNEXE% -T RasterEdge.XImage.AdvancedCleanup.Core.dll
)

IF EXIST RasterEdge.Imaging.Basic.dll (
%SNEXE% -vf RasterEdge.Imaging.Basic.dll
%SNEXE% -T RasterEdge.Imaging.Basic.dll
) ELSE (
ECHO ==== RasterEdge.Imaging.Basic.dll is missing
)

IF EXIST RasterEdge.Imaging.Basic.Codec.dll (
%SNEXE% -vf RasterEdge.Imaging.Basic.Codec.dll
%SNEXE% -T RasterEdge.Imaging.Basic.Codec.dll
) ELSE (
ECHO ==== RasterEdge.Imaging.Basic.Codec.dll is missing
)

IF EXIST RasterEdge.WDP.dll (
%SNEXE% -vf RasterEdge.WDP.dll
%SNEXE% -T RasterEdge.WDP.dll
) ELSE (
ECHO ==== RasterEdge.WDP.dll is missing
)

:End

PAUSE