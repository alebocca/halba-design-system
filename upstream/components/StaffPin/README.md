StaffPin sets or changes the 6-digit PIN that opens the hidden staff menu on the terminals of one store.

The PIN is never shown after saving: the row shows •••••• and a Change PIN button. Fields are password inputs that accept digits only. Simple PINs (repeated digits, 123456, 654321) are refused. Pass `saved` to show the confirmation, and `onSave` receives the PIN.

- Until a PIN is set the component warns that nobody can open the staff menu.
- The PIN belongs to the store, not to the terminal; all terminals of the store use it.
- Send it over HTTPS and store only a hash.
