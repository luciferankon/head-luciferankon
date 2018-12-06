./app_test_data/app_test.sh > .actual_out
diff .actual_out ./app_test_data/expected_out
message="test failed"
if [ $? -lt 1 ]; then
  message="test passed"
fi
echo $message
