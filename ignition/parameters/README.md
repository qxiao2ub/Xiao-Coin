# Ignition parameter files

1. Copy the relevant `.example.json` file.
2. Remove `.example` from the copied filename.
3. Replace the placeholder with the intended treasury address.
4. Independently verify the full address before signing any deployment.

The non-example parameter files are ignored by Git so that an accidental local
address choice is not silently treated as a reviewed production configuration.
A treasury address is public information, but keeping unreviewed deployment
configuration out of source control reduces operational mistakes.
