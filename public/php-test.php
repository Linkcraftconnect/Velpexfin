<?php

echo '<pre>';
echo 'PHP: ' . PHP_BINARY . PHP_EOL;
echo 'Version: ' . PHP_VERSION . PHP_EOL;
echo 'upload_tmp_dir: ' . ini_get('upload_tmp_dir') . PHP_EOL;
echo 'sys_temp_dir: ' . sys_get_temp_dir() . PHP_EOL;
echo 'Temp writable: ' . (is_writable(sys_get_temp_dir()) ? 'YES' : 'NO') . PHP_EOL;
echo 'Upload temp writable: ' . (is_writable(ini_get('upload_tmp_dir')) ? 'YES' : 'NO') . PHP_EOL;
echo '</pre>';