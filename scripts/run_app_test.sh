./app_tests.sh > .actual_out
diff .actual_out expected_out > state
message="test failed"
if [ echo $state ]; then
  message="test passed"
fi
echo $message
rm state
