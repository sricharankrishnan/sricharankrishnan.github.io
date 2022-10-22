# remove the origin remote and keep the scaffold ready for use

# remove git remote origin details
echo "Removing Boilerplate Git Remote Origin..."
git remote remove origin
echo ""
sleep 1

# remove the README file and docs directory
echo "Removing README file and ./docs directory..."
rm -v ./README.md
rm -rf -v ./docs
echo ""
sleep 1

# intalling npm dependecies
echo "Installing NPM dependencies..."
npm install
echo ""
sleep 1

# installing gem dependencies
echo "Installing required gems..."
bundle install
echo ""
sleep 1

# ready for use now
echo "[Jekyll Arabica Boilerplate]: Ready for Use!"
rm -v ./app-cleanup.sh
