# Find all [.turbo, .next, node_modules, .cache, dist] folders and delete them

# await confirmation
read -p "Are you sure you want to delete all [.turbo, .next, node_modules, .cache, dist] folders? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo
    echo "Deleting all [.turbo, .next, node_modules, .cache, dist] folders..."
else
    echo "Aborting..."
    exit 1
fi

# Find all .turbo folders and delete them
echo "Deleting all .turbo folders..."
find . -type d -name ".turbo" -exec rm -rf {} \;

# Find all .next folders and delete them
echo "Deleting all .next folders..."
find . -type d -name ".next" -exec rm -rf {} \;

# Find all node_modules folders and delete them
echo "Deleting all node_modules folders..."
find . -type d -name "node_modules" -exec rm -rf {} \;

# Find all .cache folders and delete them
echo "Deleting all .cache folders..."
find . -type d -name ".cache" -exec rm -rf {} \;

# Find all dist folders and delete them
echo "Deleting all dist folders..."
find . -type d -name "dist" -exec rm -rf {} \;

